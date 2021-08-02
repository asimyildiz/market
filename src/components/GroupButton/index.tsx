import { memo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import styles from "./styles.module.scss";

/**
 * props passed to GroupButton Component
 * @interface Props
 */
interface Props {
  /**
   * data to display as Buttons
   * key and value is used from same string
   * @type {string[] | undefined}
   */
  data: string[] | undefined;
  /**
   * title to display on top of buttons
   * @type {string}
   */
  title: string;
  /**
   * on change callback method
   * @type {StringCallback}
   */
  onChange: StringCallback;
}

/**
 * GroupButton Component to display data passed to it as a group of RadioButtons
 * @param {Props} param0 - passed props to GroupButton Component
 * @returns {JSX.Element}
 */
const GroupButton = ({ data, title, onChange }: Props): JSX.Element => {
  const [selected, setSelected] = useState("");

  /**
   * callback to handle button item clicks
   * @param {string} item - current clicked item
   */
  const onHandleClick = (item: string) => {
    setSelected(item);
    onChange(item);
  };

  /**
   * check if an item is selected or not using component's selected state
   * @param {string} item - item to be checked
   * @returns {boolean}
   */
  const isActiveItem = (item: string): boolean => item === selected;

  return (
    <Container>
      <Row key="title" className={styles.title}>
        <Col>{title}</Col>
      </Row>
      <Row>
        {data?.map((item: string) => (
          <Col
            key={`col_${item}`}
            xs={1}
            className={classnames("m-2", styles.noMarginLeft)}
          >
            <Button
              variant="contained"
              color="primary"
              key={`button_${item}`}
              className={classnames(
                styles.button,
                isActiveItem(item) && styles.active
              )}
              onClick={() => onHandleClick(item)}
            >
              {item}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default memo(GroupButton);
