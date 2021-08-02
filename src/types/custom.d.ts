/**
 * represents a type for object
 * {string: string}
 */
type PlainStringObject = {
  [key: string]: string;
};

/**
 * represents a type for object
 * {string: number}
 */
type PlainNumberObject = {
  [key: string]: number;
};

/**
 * represents a type for object
 * {string: T | undefined}
 */
type PlainGenericObject = {
  [key: string]: T | undefined;
};

/**
 * represents a callback method
 * that takes a string parameter
 */
type StringCallback = (s: string) => void;

/**
 * represents a callback method
 * that takes a T parameter
 */
type ObjectCallback = <T>(s: T) => void;

/**
 * represents a callback method
 * that takes an change event
 * and number (represents page)
 */
type EventCallback = (event: React.ChangeEvent<unknown>, page: number) => void;
