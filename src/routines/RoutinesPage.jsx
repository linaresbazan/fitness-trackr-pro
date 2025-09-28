import { useAuth } from "../auth/AuthContext";

import RoutineList from "./RoutineList.jsx";
import RoutineForm from "./RoutineForm.jsx";

/**
 * All users can see a list of routines.
 * If they are logged in, they will also see a form to create a routine.
 */
export default function RoutinesPage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {token && <RoutineForm />}
    </>
  );
}
