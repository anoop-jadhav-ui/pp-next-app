"use client";
import AddUserForm from "@/components/molecules/AddUserForm/AddUserForm";
import AddedBuddyList from "@/components/molecules/AddedBuddyList/AddedBuddyList";
import { useTeamMemberStore } from "@/contexts/TeamMembersStoreProvider";
import { Container, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import Footer from "../../atoms/Footer/Footer";
import Header from "../../atoms/Header/Header";
import Intro from "../../atoms/Intro/Intro";

const LandingPage = observer(() => {
  const { teamMemberList } = useTeamMemberStore();

  return (
    <Container maxWidth="sm">
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item sx={{ pt: 4 }}>
          <Intro />
        </Grid>
        <Grid item sx={{ pt: 8 }}>
          <AddUserForm />
        </Grid>
        <Grid item sx={{ pt: 0 }}>
          {teamMemberList.length > 0 && <AddedBuddyList />}
        </Grid>
        <Grid item sx={{ mt: 4 }}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
});

export default LandingPage;
