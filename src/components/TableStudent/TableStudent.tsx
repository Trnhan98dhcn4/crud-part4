import { Button, Pagination, Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IStudent } from "../../model";
import {
  currentStudentPage,
  deleteStudent,
  pageStudentSize,
  selectStudents,
  setCurrentPage,
  sortStudentsByGender,
} from "../../reducer/reducerStudent";

import "./styles.css";

function TableStudent() {
  // redux toolkit
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);

  // logic handle Delete
  const handleDelete = (student: IStudent) => {
    dispatch(deleteStudent(student));
  };
  // logic handleSortGender
  const handleSort = () => {
    dispatch(sortStudentsByGender());
  };
  // Page Table
  const currentPage = useAppSelector(currentStudentPage); // xac định 1  page
  //console.log(currentPage);
  const pageSize = useAppSelector(pageStudentSize); // xác định 1 page co 5 phần tử
  const startIndex = (currentPage - 1) * pageSize; // start la vi tri so 0
  const endIndex = startIndex + pageSize; // end la vi tri so 5;
  const visibleStudents = students.slice(startIndex, endIndex);
  //console.log(visibleStudents);

  /* Math: là định nghĩa sẵn trong JS, nó chứa các thuộc tính
  và phương thức cho phép tho hành một số tác vụ về toán học */
  /**Mail.ceil(): làm tròn một số nguyên lớn nhất tiếp theo */
  const pageCount = Math.ceil(students.length / pageSize); // xac dinh chi ra bao nhieu page
  //console.log(pageCount);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div className="container mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th onClick={handleSort}>Gender</th>
            <th>Address</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleStudents.map((item: IStudent, index: any) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                {/* new Date(item.date) luc in ra UI  
                  Date.toLocalDateString() sẽ chuyển đổi ngày tháng năm
                  (không bao gồm giờ phút giây) thành 1 chuỗi mà người dùng có thể hiểu được
                */}
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/update/${item.id}`}
                    className="btn-edit btn btn-info"
                  >
                    Edit
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(pageCount)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default TableStudent;
