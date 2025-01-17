import { LANDING_PAGE_MENU, MenuProps } from "./menus";
import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms";
import {
  CREATE_GROUP_PLACEHOLDER,
  CREATE_GROUP_PLACEHOLDER_PROPS,
} from "./placeholder";

interface LogoConstantsProps {
  landingPageMenu: MenuProps[];
  signInForm: AuthFormProps[];
  signUpForm: AuthFormProps[];
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER_PROPS[];
}

export const LOGO_CONSTANTS: LogoConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
  signInForm: SIGN_IN_FORM,
  signUpForm: SIGN_UP_FORM,
  // groupList:GROUP_LIST
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
};
