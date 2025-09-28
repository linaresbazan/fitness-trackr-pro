import { Link, useParams, useNavigate } from "react-router"
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import SetsSection from "./SetsSection.jsx";
import { useEffect, useState } from "react";

export default function RoutineDetails() {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { routineId } = useParams();
  const { data: routineData, loading: queryLoading, error: queryError} = useQuery("/routines/" + routineId, `routineId${routineId}`);
  const { token } = useAuth();
  const { mutate: deleteRoutine, loading: mutateLoading, error: mutateError}
    = useMutation("DELETE", "/routines/" + routineId, ["routines"]);
  let navigate = useNavigate();


  const deleteRoutineOnClick = async () => {
    await deleteRoutine();
    if (!mutateLoading && !mutateError) {
      setShouldNavigate(true);
    } else {
      setShouldNavigate(false);
    }
  }

  useEffect(() => {
    if (!mutateLoading && !mutateError && shouldNavigate) {
      navigate("/routines");
    }
  }, [mutateLoading, mutateError, shouldNavigate]);


  if (queryLoading || mutateLoading || !routineData) return <p>Loading...</p>;
  if (queryError) return <p>Sorry {queryError}</p>

  return (
    <div>
      <section>
        <h2>{routineData.name}</h2>
        <p>{routineData.description}</p>
        <p>By {routineData.creatorName}</p>
        {token && (
          <button onClick={() => deleteRoutineOnClick()}>
            {queryLoading || mutateLoading ? "Deleting" : queryError ? queryError : mutateError ? mutateError : "Delete"}
          </button>
        )}
        <Link to={"/routines"}>Back to Routines List</Link>
      </section>
      <SetsSection sets={routineData.sets} routineId={routineId} />
    </div>
  );
}