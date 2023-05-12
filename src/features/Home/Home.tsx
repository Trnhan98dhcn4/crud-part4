import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";

import { useAppDispatch } from "../../app/hooks";
import { TableStudent } from "../../components";
import { IStudent } from "../../model";
import { setSearchTerm } from "../../reducer/reducerStudent";
import "./styles.css";

function Home(props: {
  isUpdate: boolean;
  setIsUpdate: any;
  show: boolean;
  setShow: any;
}) {
  const { isUpdate, setIsUpdate, show, setShow } = props;
  const { register, handleSubmit, reset } = useForm<IStudent>({
    defaultValues: {
      search: "",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (student: IStudent) => {
    dispatch(setSearchTerm(student.search));
    reset();
  };
  const handleCreate = () => {
    setShow(!show);
    setIsUpdate(isUpdate);
  };
  console.log(isUpdate, "show:", show);

  return (
    <div className="container mt-5 wapper">
      <Alert
        variant="primary"
        show={show}
        onClose={() => setShow(false)}
        dismissible
      >
        {isUpdate === false ? "Add New Student connect" : ""}
      </Alert>
      <div className="info">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="edit-search"
            type="text"
            id="search"
            {...register("search")}
            placeholder="Search entities"
          />
          <button type="submit" className="edit-btn">
            Search
          </button>
        </form>

        <h1 className="text-success"> Student Details </h1>
        <Link
          to={"/create"}
          className="btn btn-primary btn-create"
          type="button"
          onClick={() => handleCreate()}
        >
          Add New Student
        </Link>
      </div>
      <TableStudent />
    </div>
  );
}

export default Home;
