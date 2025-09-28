import useQuery from "../api/useQuery";
import { Link } from "react-router";
import { useActivity } from "./ActivityContext.jsx";

/** Shows a list of activities. */
export default function ActivityList() {
  const { setActivities } = useActivity();
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  if (activities) setActivities(activities);

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

/** Shows a single activity. Logged-in users will also see a delete button. */
function ActivityListItem({ activity }) {
  
  return (
    <li>
      <Link to={"/activities/" + activity.id}>{activity.name}</Link>
    </li>
  );
}
