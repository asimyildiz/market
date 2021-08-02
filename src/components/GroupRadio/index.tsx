import { memo, useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import Radio from "@material-ui/core/Radio";
import { GroupRadioModel } from "../../models/components/group.radio";
import styles from "./styles.module.scss";

/**
 * props passed to GroupRadio Component
 * @interface Props
 */
interface Props {
  /**
   * title to display on top of list of radio boxes
   * @type {string}
   */
  title: string;
  /**
   * model of items to be displayed as a list of radio boxes
   * @type {GroupRadioModel[]}
   */
  data: GroupRadioModel[];
  /**
   * callback to be fired when a checkbox is clicked
   * @type {StringCallback}
   */
  onChange: StringCallback;
}

/**
 * GroupRadio Component to display data passed to it as a group of radio boxes
 * @param {Props} param0 - passed props to GroupRadio Component
 * @returns {JSX.Element}
 */
const GroupRadio = ({ title, data, onChange }: Props): JSX.Element => {
  const [selected, setSelected] = useState(data?.[0].key);

  /**
   * handle radio box check events
   * set state of current selected radio box
   * also call onChange method from parent
   * @param {React.ChangeEvent<HTMLInputElement>} event - change event
   */
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    onChange(event.target.value);
  };
  return (
    <FormControl component="fieldset" className={styles.groupContainer}>
      <FormLabel component="legend" className={styles.groupTitle}>
        {title}
      </FormLabel>
      <RadioGroup
        aria-label="radio"
        name="radio"
        value={selected}
        onChange={onHandleChange}
        className={styles.radioGroup}
      >
        {data?.map((item) => (
          <FormControlLabel
            key={item.key}
            value={item.key}
            control={<Radio checkedIcon={<CircleChecked />} />}
            label={item.value}
            className={styles.radioItem}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default memo(GroupRadio);
