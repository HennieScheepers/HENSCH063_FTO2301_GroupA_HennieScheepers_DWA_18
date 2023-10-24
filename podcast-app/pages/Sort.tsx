import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent } from "react";
const Sort = (props: { setSort: Function }) => {
  const handleChange = (event: SelectChangeEvent<"">) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    props.setSort(value);
  };
  return (
    <div className="sort--container">
      <p id="sort" className="sort--text">
        Sort
      </p>
      <Select
        labelId="sort"
        className="sort--select"
        value={""}
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
