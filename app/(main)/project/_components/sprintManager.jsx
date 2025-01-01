import { updateSprintStatus } from "@/actions/sprints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const SprintManager = ({ sprint, setSprint, sprints, projectId }) => {
  const [status, setStatus] = useState(sprint?.status);
  const {
    data: updatedStatus,
    loading,
    fn: updateStatusFn,
  } = useFetch(updateSprintStatus);

  const startDate = sprint.startDate;
  const endDate = sprint.endDate;
  const now = new Date();

  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";

  const canEnd = status === "ACTIVE";

  const handleSprintChange = (value) => {
    const selectedSprint = sprints?.find((s) => s.id === value);
    setSprint(selectedSprint);
    setStatus(selectedSprint.status);
  };

  const handleStatusChange = async (newStatus) => {
    await updateStatusFn(sprint.id, newStatus);
  };

  useEffect(() => {
    if (updatedStatus?.success) {
      setStatus(updatedStatus.sprint.status);
      setSprint({ ...sprint, status: updatedStatus.sprint.status });
      toast.success(`Sprint ${updatedStatus.sprint.status}`);
    }
  }, [updatedStatus]);

  const getSprintText = () => {
    if (status === "COMPLETED") {
      return "Sprint Ended";
    } else if (status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    } else if (status === "PLANNED" && isBefore(now, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }
    return null;
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Select value={sprint.id} onValueChange={handleSprintChange}>
          <SelectTrigger className="bg-slate-950 self-start">
            <SelectValue placeholder="Select sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprints?.map((spr) => (
              <SelectItem key={spr.id} value={spr?.id}>
                {spr?.name} {format(spr?.startDate, "MMM d yyyy")} to{" "}
                {format(spr?.endDate, "MMM d yyyy")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {canStart && (
          <Button
            className="bg-green-900 text-white"
            onClick={() => handleStatusChange("ACTIVE")}
            disabled={loading}
          >
            Start Sprint
          </Button>
        )}
        {canEnd && (
          <Button
            variant="destructive"
            onClick={() => handleStatusChange("COMPLETED")}
            disabled={loading}
          >
            End Sprint
          </Button>
        )}
      </div>
      {loading && <BarLoader className="mt-2" width={"100%"} color="#36d7b7" />}
      {getSprintText() && (
        <Badge className="mt-3 ml-1 self-start">{getSprintText()}</Badge>
      )}
    </>
  );
};

export default SprintManager;
