import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm.jsx";
import SetList from "./SetList.jsx";
import useMutation from "../api/useMutation.js";

/**
 * All users can see a list of routines.
 * If they are logged in, they will also see a form to create a routine.
 */
export default function SetsSection({ sets, routineId }) {
  const { token } = useAuth();

  return (
    <section>
      <h2>Sets</h2>
      <SetList sets={sets} routineId={routineId} />
      {token && <SetForm routineId={routineId} />}
    </section>
  );
}
