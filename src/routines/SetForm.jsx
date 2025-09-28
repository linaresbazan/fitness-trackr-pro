import useMutation from "../api/useMutation";
import { useActivity } from "../activities/ActivityContext.jsx";

/** Users can create new sets with a name and goal. */
export default function SetForm({ routineId }) {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/sets", [`routineId${routineId}`]);

  const addSet = (formData) => {
    const activityId = formData.get("activityDpDn");
    const count = formData.get("count");
    add({ activityId, routineId, count });
  };

  return (
    <>
      <h2>Add a set</h2>
      <form action={addSet}>
        <label>
          Activity
          <ActivityDropDown />
        </label>
        <label>
          Count
          <input type="number" name="count" />
        </label>
        <button>{loading ? "Adding..." : "Add set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}

function ActivityDropDown() {
  const { activities } = useActivity();
  return (
    <select name="activityDpDn" id="activityDpDn">
      {activities.map(activity => (
        <option key={activity.id} value={activity.id}>{activity.name}</option>
      ))}
    </select>
  );
}