import React from "react";
import { FeedInput } from "../components/Feed"
import Navbar, { ButtonBox } from '../components/common/Navbar'
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';


function WritePage() {
    const isLogin = useSelector((state: any) => state.auth.isLogin);

    return (
        <>
            <Navbar>
                <ButtonBox isLogin={isLogin}></ButtonBox>
            </Navbar>
            
            <Box sx={{ paddingTop: "4rem" }}>
                <FeedInput></FeedInput>

            </Box>
        </>

    );
  }
  
export default WritePage;