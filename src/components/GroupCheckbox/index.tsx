import { memo, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { GroupCheckboxModel } from "../../models/components/group.checkbox";
import { isSelected } from "../../utils/helpers";
import styles from "./styles.module.scss";

/**
 * props passed to GroupCheckbox Component
 * @interface Props
 */
interface Props {
  /**
   * title to display on top of list of checkboxes
   * @type {string}
   */
  title: string;
  /**
   * label to display inside input text field
   * which is being used to filter checkbox items
   * @type {string}
   */
  label: string;
  /**
   * model of items to be displayed as a list of checkboxes
   * @type {GroupCheckboxModel[] | undefined}
   */
  data: GroupCheckboxModel[] | undefined;
  /**
   * callback to be fired when a checkbox is clicked
   * @type {ObjectCallback}
   */
  onChange: ObjectCallback;
}

/**
 * GroupCheckbox Component to display data passed to it as a group of Checkboxes
 * @param {Props} param0 - passed props to GroupCheckbox Component
 * @returns {JSX.Element}
 */
const GroupCheckbox = ({
  title,
  label,
  data,
  onChange,
}: Props): JSX.Element => {
  const [selected, setSelected] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * handle checkbox check events
   * set state of current checked checkbox as true/false (toggles it)
   * also call onChange method from parent
   * @param {React.ChangeEvent<HTMLInputElement>} event - change event
   */
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelected((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    onChange({ ...selected, [name]: checked });
  };

  /**
   * filter list of checkbox items using the entered text
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - change event
   */
  const onHandleSearch = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <FormControl
      component="fieldset"
      className={styles.groupContainer}
      variant="outlined"
    >
      <FormLabel component="legend" className={styles.groupTitle}>
        {title}
      </FormLabel>
      <TextField
        id="search-brand"
        key="search-brand"
        label={label}
        variant="outlined"
        margin="dense"
        onChange={onHandleSearch}
      />
      <FormGroup className={styles.radioGroup} row>
        {data?.map((item) => {
          if (
            searchTerm !== "" &&
            !item.key
              .toLocaleLowerCase()
              .startsWith(searchTerm.toLocaleLowerCase())
          ) {
            return null;
          }

          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSelected(selected, `${item.key}`) === true}
                  onChange={onHandleChange}
                  name={item.key}
                />
              }
              key={item.key}
              label={item.value}
              className={styles.radioItem}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default memo(GroupCheckbox);
