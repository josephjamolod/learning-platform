import { LANDING_PAGE_MENU, MenuProps } from "./menus";
import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms";

interface LogoConstantsProps {
  landingPageMenu: MenuProps[];
  signInForm: AuthFormProps[];
  signUpForm: AuthFormProps[];
}

export const LOGO_CONSTANTS: LogoConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
  signInForm: SIGN_IN_FORM,
  signUpForm: SIGN_UP_FORM,
  // groupList:GROUP_LIST
  // createGroupPlaceholder:CREATE_GROUP_PLACEHOLDER
};
