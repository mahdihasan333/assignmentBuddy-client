import { format } from "date-fns";
import { Link } from "react-router-dom";

const AssignmentCard = ({ assignment, handleDelete }) => {
  // details of the assignment

  // update the assignment

  const { _id, title, deadline, difficulty, imageUrl, marks, description } =
    assignment || {};
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Deadline: {format(new Date(deadline), "P")}</p>
        <div className="flex items-center gap-10">
          <p>{marks}</p>
          <p>{difficulty}</p>
        </div>
        <p>{description}</p>

        <div className="card-actions">
          <Link to={`/assignment/${_id}`}>
            <button className="btn btn-primary">View Assignment</button>
          </Link>
          <Link to={`/update/${_id}`}>
            <button className="btn btn-primary">Update</button>
          </Link>
          <button onClick={() => handleDelete(_id)} className="btn btn-primary">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
