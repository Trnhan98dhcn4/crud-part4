import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StudentFake from "../api/StudentFake";
import { IStudent, StudentState } from "../model";
import { LOCAL_STORAGE } from "../constant/student.constant";
import { RootState } from "../app/store";

const initialState: StudentState = {
  students: StudentFake,
  searchTerm: "",
  currentPage: 1,
  pageSize: 5,
};

const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    // action create
    createStudent: (state, action: PayloadAction<IStudent>) => {
      state.students.push(action.payload);
      // save in localStorage
      localStorage.setItem(
        LOCAL_STORAGE.student,
        JSON.stringify(state.students)
      );
    },
    // action update
    updateStudent: (state, action: PayloadAction<IStudent>) => {
      const student_ = action.payload;
      const index = state.students.findIndex((f) => f.id === student_.id);
      state.students[index] = student_;
      // save in localStorage
      localStorage.setItem(
        LOCAL_STORAGE.student,
        JSON.stringify(state.students)
      );
    },
    // action delete
    deleteStudent: (state, action: PayloadAction<IStudent>) => {
      const student_ = action.payload;
      const index = state.students.findIndex((f) => f.id === student_.id);
      if (index !== -1) {
        state.students.splice(index, 1);
      }
      // save in localStorage
      localStorage.setItem(
        LOCAL_STORAGE.student,
        JSON.stringify(state.students)
      );
    },
    // action sort
    sortStudentsByGender: (state) => {
      state.students.sort((a, b) => a.gender.localeCompare(b.gender));
      //state.sort((a, b) => a.gender.localeCompare(b.gender));
    },
    // action search
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    // action 1 page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // action 5 item
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

const { reducer, actions } = student;
export const {
  createStudent,
  updateStudent,
  deleteStudent,
  sortStudentsByGender,
  setSearchTerm,
  setCurrentPage,
  setPageSize,
} = actions;

export const selectStudents = (state: RootState) => {
  const { students, searchTerm } = state.student;
  if (!searchTerm) {
    return students;
  }
  // toLowerCase dùng để chuyển đổi tất cả các ký tự trong một chuỗi về dạng chữ thường
  // includes trả về True/False kiểm tra xem 1 chuỗi có chữa 1 ký tự hoặc 1 con nào hay không
  return students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const currentStudentPage = (state: RootState) => {
  return state.student.currentPage;
};

export const pageStudentSize = (state: RootState) => {
  return state.student.pageSize;
};

export default reducer;
