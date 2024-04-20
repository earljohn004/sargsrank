import React, { ReactNode } from "react";
import {
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useRouterType,
  useResource,
  ITreeMenu,
  useMenu,
  CanAccess,
} from "@refinedev/core";
import {
  CreateButton,
  Breadcrumb,
  CreateButtonProps,
} from "@refinedev/mui";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import type { ListProps } from "@refinedev/mui";
import { Link } from "react-router-dom";

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const TabView: React.FC<ListProps> = ({
  title,
  canCreate,
  children,
  createButtonProps: createButtonPropsFromProps,
  resource: resourceFromProps,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
}) => {
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();
  const getUserFriendlyName = useUserFriendlyName();
  const { menuItems, selectedKey } = useMenu();

  const routerType = useRouterType();

  const { resource, identifier } = useResource(resourceFromProps);

  const isCreateButtonVisible =
    canCreate ??
    ((resource?.canCreate ?? !!resource?.create) || createButtonPropsFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? (
      <>{breadcrumb}</> ?? undefined
    ) : (
      <Breadcrumb />
    );

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? {
        resource: routerType === "legacy" ? resource?.route : identifier,
        ...createButtonPropsFromProps,
      }
    : undefined;

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {items.map((item: ITreeMenu) => {
          const {
            icon,
            label,
            route,
            name,
            key,
          } = item;

          const isSelected = key === selectedKey;

          return (
            <CanAccess
              key={item.key}
              resource={name.toLowerCase()}
              action="list"
              params={{
                resource: item,
              }}
            >
              <li key={label}>
                <Link
                  to={route ?? "/"}
                  style={{
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  {icon}
                  <span>{label ?? name}</span>
                </Link>
              </li>
            </CanAccess>
          );
        })}
      </>
    );
  };

  const renderSelectedChildren = (items: ITreeMenu[]) => {
    let node: ReactNode;
    items.map((item: ITreeMenu) => {
      if (`/${item.name}` === selectedKey) {
        node = renderMenuItems(item.children);
      }
    });
    return node;
  };

  return (
    <>
      <div>{renderSelectedChildren(menuItems)}</div>
      <Card {...(wrapperProps ?? {})}>
        {breadcrumbComponent}
        <CardHeader
          sx={{
            display: "flex",
            flexWrap: "wrap",
            ".MuiCardHeader-action": {
              margin: 0,
              alignSelf: "center",
            },
          }}
          title={
            title ?? (
              <Typography variant="h5">
                {translate(
                  `${identifier}.titles.list`,
                  getUserFriendlyName(
                    resource?.meta?.label ??
                      resource?.options?.label ??
                      resource?.label ??
                      identifier,
                    "plural"
                  )
                )}
              </Typography>
            )
          }
          action={
            <Box display="flex" gap="16px" {...headerButtonProps}>
              {headerButtons
                ? typeof headerButtons === "function"
                  ? headerButtons({
                      defaultButtons: defaultHeaderButtons,
                      createButtonProps,
                    })
                  : headerButtons
                : defaultHeaderButtons}
            </Box>
          }
          {...(headerProps ?? {})}
        />
        <CardContent {...(contentProps ?? {})}>{children}</CardContent>
      </Card>
    </>
  );
};
