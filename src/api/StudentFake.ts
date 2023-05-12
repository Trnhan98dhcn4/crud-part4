import { LOCAL_STORAGE } from "../constant/student.constant";
import { IStudent } from "../model";

const studentStorage = localStorage.getItem(LOCAL_STORAGE.student);

const StudentFake: IStudent[] = studentStorage
  ? JSON.parse(studentStorage)
  : [];

export default StudentFake;
