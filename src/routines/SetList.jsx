import { useAuth } from "../auth/AuthContext.jsx";
import useMutation from "../api/useMutation.js";

/** Shows a List of Sets. */
export default function SetList({ sets, routineId }) {

  if (sets.length === 0) return <p>This routine doesn't have any sets. Add one?</p>

  return (
    <ul>
      {sets.map((set) => (
        <SetListItem key={set.id} set={set} routineId={routineId} />
      ))}
    </ul>
  );
}

/** Shows a single set. Logged-in users will also see a delete button. */
function SetListItem({ set, routineId }) {
  const { token } = useAuth();
  const { mutate: deleteSet, loading: mutateLoading, error: mutateError}
    = useMutation("DELETE", "/sets/" + set.id, [`routineId${routineId}`]);

  return (
    <li>
      <p>{set.name} x {set.count}</p>
      {token && (
        <button onClick={() => {
          deleteSet();
        }}>
          {mutateLoading ? "Deleting" : mutateError ? mutateError : "Delete"}
        </button>
      )}
    </li>
  )
}