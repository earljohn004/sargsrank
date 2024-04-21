import React, { ReactNode } from "react";
import { useResource, ITreeMenu, useMenu, CanAccess } from "@refinedev/core";
import { Link } from "react-router-dom";

interface ITabView {
  resource: string;
}

export const PageMenu: React.FC<ITabView> = (props) => {
  const { menuItems } = useMenu();

  const { resource } = useResource(props.resource);

  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {/* <Tabs role="navigation"> */}
        {items.map((item: ITreeMenu) => {
          const { label, route, name } = item;

          return (
            <CanAccess
              key={item.key}
              resource={name.toLowerCase()}
              action="list"
              params={{
                resource: item,
              }}
            >
              <Link
                to={route ?? "/"}
                style={{
                  marginRight: 20,
                }}
              >
                {label ?? name}
              </Link>
            </CanAccess>
          );
        })}
      </>
    );
  };

  const renderSelectedChildren = (items: ITreeMenu[]) => {
    let node: ReactNode;
    items.map((item: ITreeMenu) => {
      if (item.name === props.resource) {
        node = renderMenuItems(item.children);
      }
    });
    return node;
  };

  return <>{renderSelectedChildren(menuItems)}</>;
};
