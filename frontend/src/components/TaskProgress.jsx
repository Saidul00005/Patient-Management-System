import { LinearProgress, Typography } from "@mui/material";
import dayjs from "dayjs";

// Function to calculate the percentage of progress based on total time and remaining time
const calculateProgress = (startDate, expectedCompletionDate) => {
  const start = dayjs(startDate);
  const end = dayjs(expectedCompletionDate);
  const now = dayjs();

  // Calculate the total time duration (in days) and the elapsed time (in days)
  const totalDuration = end.diff(start, "day"); // Total number of days between start and end
  const elapsedDuration = now.diff(start, "day"); // Days elapsed since the start

  // Ensure the progress is between 0% and 100%
  const progress = Math.min(
    Math.max((elapsedDuration / totalDuration) * 100, 0),
    100
  );
  return progress;
};

const TaskProgress = ({ task }) => {
  const { start_date, expected_completion_date } = task;

  // Calculate the progress percentage based on the start and end dates
  const progress = calculateProgress(start_date, expected_completion_date);

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2">{`Progress: ${Math.round(
        progress
      )}%`}</Typography>
    </div>
  );
};

export default TaskProgress;
