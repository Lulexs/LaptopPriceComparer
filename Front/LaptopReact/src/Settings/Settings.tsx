import { Checkbox, Stack, Flex, Text } from "@mantine/core";
import classes from "./Settings.module.css";

interface SettingsProps {
  infScroll: boolean;
  setInfScroll: (infScroll: boolean) => void;
}

export default function Settings(props: SettingsProps) {
  return (
    <Flex align="center" justify="center" flex={1}>
      <Stack>
        <Text fw={500} ta="center">
          Display style
        </Text>
        <Checkbox
          classNames={classes}
          label="Infinite scroll"
          checked={props.infScroll}
          onChange={(event) => props.setInfScroll(event.currentTarget.checked)}
          wrapperProps={{
            onClick: () => props.setInfScroll(!props.infScroll),
          }}
        />
        <Checkbox
          classNames={classes}
          label="Pagination"
          checked={!props.infScroll}
          onChange={(event) => props.setInfScroll(event.currentTarget.checked)}
          wrapperProps={{
            onClick: () => props.setInfScroll(!props.infScroll),
          }}
        />
      </Stack>
    </Flex>
  );
}
