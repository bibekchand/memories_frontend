import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Dropdown,
  Form,
  Header,
  Input,
  Label,
  TextField,
  TimeField,
  TextArea,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import { useThemeStore } from "../store/useThemeStore.jsx";
import useTasks from "../hooks/useTasks.jsx";
import useProjects from "../hooks/useProjects.jsx";
export default function TaskBar() {
  const theme = useThemeStore((state) => state.theme);
  const [date, setDate] = useState(null);
  const { addTask, selectedProjects, setSelectedProjects } = useTasks();
  const { projectList } = useProjects();
  return (
    <div className="p-2 mt-2 w-[full] h-fit">
      <Form onSubmit={addTask}>
        <TextField
          isRequired
          className="w-full max-w-full"
          name="title"
          type="text"
          variant={theme === "light" ? "primary" : "secondary"}
        >
          <Label>Title</Label>
          <Input placeholder="Title" className="h-20 text-4xl p-2" />
        </TextField>

        <TextField
          className="w-full mt-2"
          name="description"
          type="text"
          variant={theme === "light" ? "primary" : "secondary"}
        >
          <Label>Description</Label>
          <TextArea placeholder="Describe your task" className="w-full" rows={4} />
        </TextField>
        <div className="flex flex-col gap-2 w-full mt-2 lg:flex-row">
          <DatePicker
            isRequired
            className="lg:w-1/2 w-full"
            name="date"
            value={date}
            onChange={setDate}
          >
            <Label>Date</Label>
            <DateField.Group
              fullWidth
              variant={theme === "light" ? "primary" : "secondary"}
            >
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateField.Suffix>
                <DatePicker.Trigger>
                  <DatePicker.TriggerIndicator />
                </DatePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>
            <DatePicker.Popover>
              <Calendar aria-label="Event date">
                <Calendar.Header>
                  <Calendar.YearPickerTrigger>
                    <Calendar.YearPickerTriggerHeading />
                    <Calendar.YearPickerTriggerIndicator />
                  </Calendar.YearPickerTrigger>
                  <Calendar.NavButton slot="previous" />
                  <Calendar.NavButton slot="next" />
                </Calendar.Header>
                <Calendar.Grid>
                  <Calendar.GridHeader>
                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                  </Calendar.GridHeader>
                  <Calendar.GridBody>
                    {(date) => <Calendar.Cell date={date} />}
                  </Calendar.GridBody>
                </Calendar.Grid>
                <Calendar.YearPickerGrid>
                  <Calendar.YearPickerGridBody>
                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                  </Calendar.YearPickerGridBody>
                </Calendar.YearPickerGrid>
              </Calendar>
            </DatePicker.Popover>
          </DatePicker>
          <TimeField className="lg:w-1/2 w-full" name="time">
            <Label>Time</Label>
            <TimeField.Group
              variant={theme === "light" ? "primary" : "secondary"}
            >
              <TimeField.Input>
                {(segment) => <TimeField.Segment segment={segment} />}
              </TimeField.Input>
            </TimeField.Group>
          </TimeField>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button
            className="bg-purple-500"
            onPress={() => setDate(today(getLocalTimeZone()))}
          >
            Set today
          </Button>

          <Button
            className="bg-cyan-500"
            onPress={() => setDate(today(getLocalTimeZone()).add({ days: 1 }))}
          >
            Set tomorrow
          </Button>
          <Button className="bg-red-500" onPress={() => setDate(null)}>
            Clear
          </Button>
        </div>
        <Dropdown>
          <Button aria-label="Menu" variant="secondary" className="mt-2 p-2">
            Project
          </Button>
          <Dropdown.Popover className="min-w-[256px]">
            <Dropdown.Menu
              selectedKeys={selectedProjects}
              selectionMode="multiple"
              onSelectionChange={setSelectedProjects}
            >
              <Dropdown.Section>
                <Header>Select a project</Header>
                {projectList.map((item) => (
                  <Dropdown.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.name}
                  >
                    <Dropdown.ItemIndicator />
                    <Label>{item.name}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        <Button type="submit" className="ml-2">
          Add
        </Button>
      </Form>
    </div>
  );
}
