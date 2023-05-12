import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IStudent } from "../../model";
import { createStudent, updateStudent } from "../../reducer/reducerStudent";

import "./styles.css";

function FormStudent(props: { isUpdate: boolean }) {
  const { isUpdate } = props;
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IStudent>({
    defaultValues: {
      name: "",
      gender: "",
      address: "",
      date: new Date(),
    },
  });

  //react - router- dom
  const navigate = useNavigate();
  const { id } = useParams();

  //redux toolkit
  const students = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  //use logic on  Edit
  useEffect(() => {
    if (id) {
      const ExitStudent = students.students.filter((f) => f.id === Number(id));
      setValue("name", ExitStudent[0].name);
      setValue("gender", ExitStudent[0].gender);
      setValue("address", ExitStudent[0].address);
      setValue("date", ExitStudent[0].date);
    }
  }, [id]);

  //logic onSubmit
  const onSubmit = (student: IStudent) => {
    if (isUpdate === false) {
      student.id =
        students.students.length === 0
          ? 1
          : students.students[students.students.length - 1].id + 1;
      dispatch(createStudent(student));
      reset();
    } else {
      student.id = Number(id);
      dispatch(updateStudent(student));
    }

    navigate("/");
  };

  return (
    <div className="container mt-5 wapper-form">
      <div className="info-form">
        <h2 className="text-success">Add New Student</h2>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Register is Name",
              },
            })}
            placeholder="Enter Name..."
          />
          <Form.Text className="error">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender:</Form.Label>
          <Form.Select
            {...register("gender", {
              required: {
                value: true,
                message: "Register is Gender",
              },
            })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            {...register("address", {
              required: {
                value: true,
                message: "Register is address",
              },
            })}
            placeholder="Enter Name..."
          />
          <Form.Text className="error">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            {...register("date", {
              required: {
                value: true,
                message: "Register is address",
              },
            })}
            placeholder="Enter Date..."
          />
          <Form.Text className="error">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          {isUpdate === false ? "Submit" : "Update"}
        </Button>
      </Form>
    </div>
  );
}

export default FormStudent;
