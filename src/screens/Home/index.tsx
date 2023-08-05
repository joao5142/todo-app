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
  DescriptionText,
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
import { useEffect, useState } from "react";

import { MenuActions } from "./components/MenuActions";

import { produce } from "immer";

import Toast from "react-native-toast-message";

import { AxiosError } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@/lib/api";

import { TOKEN_COLLECTION } from "@/storage";

interface ITask {
  id: number;
  description: string;
  completed: false;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ITaskList {
  id: 1;
  title: string;
  data: ITask[];
}

type FilterTypes = "all" | "todo" | "completed";

interface FilterItems {
  name: string;
  value: FilterTypes;
}
interface TaskRelatory {
  total: number;
  completed: number;
}
const filterItems: FilterItems[] = [
  { name: "Todas", value: "all" },
  { name: "A fazer", value: "todo" },
  { name: "Feitas", value: "completed" },
];

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskList, setTaskList] = useState<ITaskList[]>();
  const [taskRelatory, setTaskRelatory] = useState<TaskRelatory>();

  const [selectedFilterItem, setSelectedFilterItem] =
    useState<FilterTypes>("all");

  const logout = useStore((state) => state.logout);

  function handleCreateTask() {
    SheetManager.show("create-sheet", {
      payload: { onCreate: () => fetchTasks() },
    });
  }

  async function handleLogout() {
    try {
      const {
        data: { message },
      } = await api.post("/logout");

      await AsyncStorage.removeItem(TOKEN_COLLECTION);

      Toast.show({
        type: "success",
        text1: message,
      });

      logout();
    } catch (err) {
      const error = err as AxiosError;

      Toast.show({
        type: "error",
        text1: error.message || "Error ao Deslogar.",
      });
    } finally {
      setIsLoading(false);
    }
    // logout();
  }

  function handleOpenViewTaskModal() {
    setIsTaskModalOpen(true);
  }

  function handleCloseViewTaskModal() {
    setIsTaskModalOpen(false);
  }

  function handleEditTask(item: ITask) {
    SheetManager.show("edit-sheet", {
      payload: { item, onEdit: () => fetchTasks() },
    });
  }

  async function handleToggleTask(item: ITask, section: ITaskList) {
    setIsLoading(true);

    try {
      const {
        data: { message },
      } = await api.patch("/task/edit/" + item.id, {
        completed: !item.completed,
      });

      changeCompletedInTaskItem(item, section, !item.completed);
      await fetchTaskRelatory();
    } catch (err) {
      const error = err as AxiosError;
      Toast.show({
        type: "error",
        text1: error.message || "Error ao Deslogar.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function handleCompleteTask(item: ITask, section: ITaskList) {
    setIsLoading(true);

    try {
      const {
        data: { message },
      } = await api.patch("/task/edit/" + item.id, {
        completed: true,
      });

      changeCompletedInTaskItem(item, section, true);
    } catch (err) {
      const error = err as AxiosError;
      Toast.show({
        type: "error",
        text1: error.message || "Error ao Deslogar.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      const {
        data: { message },
      } = await api.delete("/task/delete/" + id);

      fetchTasks();
    } catch (err) {
      const error = err as AxiosError;
      Toast.show({
        type: "error",
        text1: error.message || "Error ao Deslogar.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function changeCompletedInTaskItem(
    item: ITask,
    section: ITaskList,
    value: boolean
  ) {
    const newItems = produce(taskList, (draft) => {
      let sectionList = draft!.find(
        (sectionList) => sectionList.id == section.id
      );

      let itemList = sectionList?.data.find(
        (itemList) => itemList.id == item.id
      );

      if (itemList) {
        itemList.completed = Boolean(value);
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

  async function fetchTasks(filterParam: string = "") {
    try {
      const {
        data: { message, tasks },
      } = await api.get("/task/all?filter=" + filterParam);

      await fetchTaskRelatory();
      setTaskList(tasks);
    } catch (err) {
      const error = err as AxiosError;

      Toast.show({
        type: "error",
        text1: error.message || "Error ao pegar dados.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTaskRelatory() {
    try {
      const {
        data: { relatory },
      } = await api.get("/task/relatory");
      setTaskRelatory(relatory);
    } catch (err) {
      const error = err as AxiosError;
      Toast.show({
        type: "error",
        text1: error.message || "Error ao pegar dados.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function handleFetchTasks(value: FilterTypes) {
    await fetchTasks(value);
    setSelectedFilterItem(value);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

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
                handleFetchTasks(button.value);
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

      {taskList && (
        <SectionList
          style={{ maxHeight: 400 }}
          sections={taskList}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item, section }) => (
            <TouchableOpacity onPress={handleOpenViewTaskModal}>
              <TaskContainer>
                <TouchableOpacity
                  onPress={() => handleToggleTask(item, section)}
                >
                  {!item.completed ? (
                    <Image source={checkboxEmptyImg} />
                  ) : (
                    <Image width={30} source={checkboxFillImg} />
                  )}
                </TouchableOpacity>

                <DescriptionText size="MD">{item.description}</DescriptionText>

                <DotsViewContainer>
                  <MenuActions
                    onDelete={() => handleDeleteTask(item.id)}
                    onComplete={() => handleCompleteTask(item, section)}
                    onEdit={() => handleEditTask(item)}
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
      )}

      <FooterContainer>
        <Container>
          <Text weight="regular">
            Total de tarefas:{" "}
            <Text color="GREEN_300" weight="bold">
              {taskRelatory?.total}/{taskRelatory?.completed}
            </Text>
          </Text>
        </Container>

        <Navigation>
          <NavigationItem onPress={fetchTasks}>
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
