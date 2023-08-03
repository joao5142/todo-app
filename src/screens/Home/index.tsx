import {
  Container,
  FilterButtonsContainer,
  HomeContainer,
  LineSeparator,
  TaskContainer,
  TitleContainer,
  FooterContainer,
  Navigation,
  NavigationItem,
  NavigationButton,
  DotsViewContainer,
} from "./styles";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

import { Entypo } from "@expo/vector-icons";

import {
  SectionList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import checkboxEmptyImg from "@assets/images/checkbox-empty.png";
import checkboxFillImg from "@assets/images/checkbox-fill.png";

import { ViewTaskModal } from "./components/ViewTaskModal";

import { useStore } from "../../store/index";
import { useState } from "react";

import { MenuActions } from "./components/MenuActions";

import { produce } from "immer";

interface ITask {
  id: number;
  name: string;
  status: "pending" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}

interface ITaskList {
  id: 1;
  title: string;
  data: ITask[];
}
const DATA: ITaskList[] = [
  {
    id: 1,
    title: "Qua. 17 de março de 2021",
    data: [
      { id: 1, name: "Tarefa 1", status: "pending" },
      { id: 2, name: "Tarefa 2", status: "completed" },
      { id: 3, name: "Tarefa 3", status: "pending" },
    ],
  },
];

type FilterTypes = "all" | "pending" | "completed";

interface FilterItems {
  name: string;
  value: FilterTypes;
}
const filterItems: FilterItems[] = [
  { name: "Todas", value: "all" },
  { name: "A fazer", value: "pending" },
  { name: "Feitas", value: "completed" },
];

export function Home() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskList, setTaskList] = useState(DATA);
  const [selectedFilterItem, setSelectedFilterItem] =
    useState<FilterTypes>("all");

  const updateUserLogged = useStore((state) => state.updateUserLogged);

  function handleCreateTask() {
    SheetManager.show("create-sheet");
  }

  function handleLogout() {
    updateUserLogged(false);
  }

  function handleOpenViewTaskModal() {
    setIsTaskModalOpen(true);
  }

  function handleCloseViewTaskModal() {
    setIsTaskModalOpen(false);
  }

  function handleEditTask(id: number) {
    console.log(id);
    SheetManager.show("edit-sheet");
  }
  function handleCompleteTask(id: number) {
    console.log(id);
  }
  function handleDeleteTask(id: number) {
    console.log(id);
  }

  function handleToggleTask(item: ITask, section: ITaskList) {
    const newItems = produce(taskList, (draft) => {
      let sectionList = draft.find(
        (sectionList) => sectionList.id == section.id
      );

      let itemList = sectionList?.data.find(
        (itemList) => itemList.id == item.id
      );

      if (itemList) {
        itemList.status =
          itemList?.status == "completed" ? "pending" : "completed";
      }
    });

    setTaskList(newItems);
  }

  function getSelectedFilterBg(item: FilterTypes) {
    if (item == selectedFilterItem) {
      return "GREEN_300";
    } else {
      return "GRAY_100";
    }
  }

  function getSelectedFilterColor(item: FilterTypes) {
    if (item == selectedFilterItem) {
      return "WHITE";
    } else {
      return "GRAY_500";
    }
  }

  return (
    <HomeContainer>
      <Container>
        <Text size="MD" weight="bold">
          Filtrar
        </Text>
        <FilterButtonsContainer>
          {filterItems.map((button, index) => (
            <Button
              key={"button" + index}
              onPress={() => {
                setSelectedFilterItem(button.value);
              }}
              background={getSelectedFilterBg(button.value)}
            >
              <Text
                size="SM"
                color={getSelectedFilterColor(button.value)}
                weight="bold"
              >
                {button.name}
              </Text>
            </Button>
          ))}
        </FilterButtonsContainer>
      </Container>
      <LineSeparator />

      <SectionList
        style={{ maxHeight: 400 }}
        sections={taskList}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item, section }) => (
          <TouchableOpacity onPress={handleOpenViewTaskModal}>
            <TaskContainer>
              <TouchableOpacity onPress={() => handleToggleTask(item, section)}>
                {item.status == "pending" ? (
                  <Image source={checkboxEmptyImg} />
                ) : (
                  <Image width={30} source={checkboxFillImg} />
                )}
              </TouchableOpacity>
              <Text size="MD">{item.name}</Text>

              <DotsViewContainer>
                <MenuActions
                  onDelete={() => handleDeleteTask(item.id)}
                  onComplete={() => handleCompleteTask(item.id)}
                  onEdit={() => handleEditTask(item.id)}
                />
              </DotsViewContainer>
            </TaskContainer>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <TitleContainer>
            <Text size="MD" weight="bold">
              {title}
            </Text>
          </TitleContainer>
        )}
      />
      <FooterContainer>
        <Container>
          <Text weight="regular">
            Total de tarefas:{" "}
            <Text color="GREEN_300" weight="bold">
              1/3
            </Text>
          </Text>
        </Container>

        <Navigation>
          <NavigationItem>
            <Entypo name="home" color="#1FCC79" size={24} />
            <Text fontFamily="secondary" size="XS" color="GREEN_300">
              Home
            </Text>
          </NavigationItem>

          <NavigationItem onPress={handleCreateTask}>
            <NavigationButton>
              <Entypo name="plus" color="white" size={44} />
            </NavigationButton>
            <Text fontFamily="secondary" size="XS" color="GRAY_500">
              Adicionar
            </Text>
          </NavigationItem>
          <NavigationItem onPress={handleLogout}>
            <Entypo name="log-out" color="#9FA5C0" size={24} />
            <Text fontFamily="secondary" size="XS" color="GRAY_500">
              Logout
            </Text>
          </NavigationItem>
        </Navigation>
      </FooterContainer>

      {isTaskModalOpen && <ViewTaskModal onClose={handleCloseViewTaskModal} />}
    </HomeContainer>
  );
}
