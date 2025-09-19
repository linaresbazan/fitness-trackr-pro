import { Link, useParams, useNavigate } from "react-router"
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const { data: activityData, loading: queryLoading, error: queryError} = useQuery("/activities/" + activityId); 
  const { token } = useAuth();
  const { mutate: deleteActivity, loading: mutateLoading, error: mutateError} 
    = useMutation("DELETE", "/activities/" + activityId, ["activities"]);
  let navigate = useNavigate();


  if (queryLoading || mutateLoading || !activityData) return <p>Loading...</p>;
  if (queryError) return <p>Sorry {queryError}</p>
  if (mutateError) return <p>Sorry {mutateError}</p>

  return (
    <div>
      <section>
        <h2>{activityData.name}</h2>
        <p>{activityData.description}</p>
        <p>By {activityData.creatorName}</p>
        {token && (
          <button onClick={() => {
            deleteActivity();
            navigate("/activities");
            }}>
            {queryLoading || mutateLoading ? "Deleting" : queryError ? queryError : mutateError ? mutateError : "Delete"}
          </button>
        )}
        <Link to={"/activities"}>Back to Activities List</Link>
      </section>
    </div>
  );
}