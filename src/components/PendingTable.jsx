const PendingTable = ({ assignment }) => {
  console.log("this is ", assignment);

  return (
    <div>
      <tr>
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {assignment?.title}
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-2">
            <p
              className={`px-3 py-1  ${
                assignment.difficulty === "easy" &&
                "text-blue-500 bg-blue-100/60"
              } 
                            ${
                              assignment.difficulty === "medium" &&
                              "text-green-500 bg-green-100/60"
                            }
                            ${
                              assignment.difficulty === "hard" &&
                              "text-red-500 bg-red-100/60"
                            }
                            text-xs  rounded-full`}
            >
              {assignment.difficulty}
            </p>
          </div>
        </td>

        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {assignment.marks}
        </td>
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {assignment.marks}
        </td>
      </tr>
    </div>
  );
};

export default PendingTable;
