import React from "react";
import styled from "styled-components";
import CreateTasks from "./CreateTasks";
import TaskList from "./TaskList";
import ScrollingDraggable from "./ScrollingDraggable";
import { CompletedTasks } from "./CompletedTasks";

const Homepage = () => (
  <Sections>
    <Section1>
      <CompletedTasks />
    </Section1>
    <Section2>
      <CreateTasks />
      <TaskList />
    </Section2>
    <Section3>Things to do (Section 3)</Section3>
  </Sections>
);

const Sections = styled.div`
  display: grid;
  /* grid-template-columns: [section1] 20% [section2]45% [section3]35%; */
  grid-template-columns: [section1] 10% [section2]80% [section3]10%;
  width: auto;
`;
const Section1 = styled.div`
  grid-column: section1;
  background: blue;
`;
const Section2 = styled.div`
  grid-column: section2;
  background: white;
`;
const Section3 = styled.div`
  grid-column: section3;
  background: green;
`;

export default Homepage;
