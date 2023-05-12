import { Pagination } from "react-bootstrap";

function PaginationStudent(props: {
  count: number;
  paginate: (pageNumber: number) => void;
  pagesPerPage: number;
  currentPage: number;
}) {
  const { count, paginate, pagesPerPage, currentPage } = props;
  const pagesCount = Math.ceil(count / pagesPerPage);
  const onPageNumberClick = (i: number) => {
    paginate(i);
  };
  return (
    <Pagination>
      {[...new Array(pagesCount)].map((_, i) => (
        <Pagination.Item
          key={i}
          active={i + 1 === currentPage}
          onClick={() => onPageNumberClick(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

export default PaginationStudent;
