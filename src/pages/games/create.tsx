import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useGetIdentity } from "@refinedev/core";

interface IIdentity {
  email: string;
  uid: string;
}

export const CreateGame = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    setValue,
    control,
  } = useForm({});

  const { autocompleteProps: playersResource } = useAutocomplete({
    resource: "players",
  });

  const { autocompleteProps: modesResource } = useAutocomplete({
    resource: "modes",
  });
  const quantityRef = useRef<HTMLInputElement>(null);
  const { data: identity } = useGetIdentity<IIdentity>();

  // useEffect(() => {
  //   if (quantityRef.current) {
  //     setValue("totalPrice", totalPrice);
  //     setValue("quantity", quantityRef.current.value);
  //     setValue("inventory.retailPrice", retailPrice);
  //     setValue("inventory.item", option);

  //     setValue("timestamp", Date.now());
  //     setValue("addedBy", identity?.email)
  //   }
  // }, [totalPrice, setValue, setRetailPrice, retailPrice, option, identity]);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name={"player1"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...playersResource}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
                console.log(value);
              }}
              getOptionLabel={(item) => {
                return (
                  playersResource?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Player 1"}
                  margin="normal"
                  variant="outlined"
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name={"player2"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...playersResource}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
                console.log(value);
              }}
              getOptionLabel={(item) => {
                return (
                  playersResource?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Player 2"}
                  margin="normal"
                  variant="outlined"
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name={"mode"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...modesResource}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
                console.log(value);
              }}
              getOptionLabel={(item) => {
                return (
                  modesResource?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Game Mode"}
                  margin="normal"
                  variant="outlined"
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
};
