import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import { TaskModel } from "../@types/types";
import { useColumnTasks } from "../hooks/useColumnTasks";
import { useDropColumn } from "../hooks/useDropColumn";
import { ColumnType } from "../utils/enums";
import Task from "./Task";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

const Column = ({ column }: { column: ColumnType }) => {
  const { tasks, addEmptyTask, deleteTask, updateTask, dropTaskFrom, swapTasks } =
    useColumnTasks(column);
  const { dropRef, isOver } = useDropColumn(column, dropTaskFrom);
  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      index={index}
      task={task}
      onDelete={deleteTask}
      onUpdate={updateTask}
      onDropHover={swapTasks}
    />
  ));
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={1} rounded="lg" colorScheme={ColumnColorScheme[column]}>
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue("gray.500", "gray.200")}
        bgColor={useColorModeValue("gray.300", "gray.600")}
        py={2}
        variant="solid"
        colorScheme={"black"}
        aria-label="add-task"
        icon={<AddIcon />}
        onClick={addEmptyTask}
      />
      <Stack
        ref={dropRef}
        h={{ base: 300, md: 600 }}
        rounded="lg"
        boxShadow="md"
        bgColor={useColorModeValue("gray.300", "gray.900")}
        p={4}
        mt={2}
        spacing={4}
        direction={{ base: "row", md: "column" }}
        opacity={isOver ? 0.85 : 1}
        overflow="auto"
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
};

export default Column;
