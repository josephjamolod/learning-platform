import { LANDING_PAGE_MENU, MenuProps } from "./menus";
import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms";
import {
  CREATE_GROUP_PLACEHOLDER,
  CREATE_GROUP_PLACEHOLDER_PROPS,
} from "./placeholder";
import { GROUP_LIST, GroupListProps } from "./slider";

interface LogoConstantsProps {
  landingPageMenu: MenuProps[];
  signInForm: AuthFormProps[];
  signUpForm: AuthFormProps[];
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER_PROPS[];
  groupList: GroupListProps[];
}

export const LOGO_CONSTANTS: LogoConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
  signInForm: SIGN_IN_FORM,
  signUpForm: SIGN_UP_FORM,
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
  groupList: GROUP_LIST,
};
