import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Sort = (props: { setSort: Function; sort: "" }) => {
  const handleChange = (event: SelectChangeEvent<"">) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    props.setSort(value);
  };
  return (
    <div className="sort--container">
      <p id="sort" className="sort--text ">
        Sort
      </p>
      <Select
        labelId="sort"
        className="sort--select"
        value={props.sort}
        onChange={handleChange}
      >
        <MenuItem className="sort--option" value={"a-z"}>
          A-Z
        </MenuItem>
        <MenuItem className="sort--option" value={"z-a"}>
          Z-A
        </MenuItem>
        <MenuItem className="sort--option" value={"updateAsc"}>
          Date updated ⬆
        </MenuItem>
        <MenuItem className="sort--option" value={"updateDesc"}>
          Date updated ⬇
        </MenuItem>
      </Select>
    </div>
  );
};

export default Sort;
