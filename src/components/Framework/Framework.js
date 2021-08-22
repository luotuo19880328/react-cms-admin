import React from "react";
import { Layout } from 'antd';
import NavBar from "../NavBar/";
import SideMenu from "../SideMenu";
import { Route, Switch } from "react-router-dom";
//导入模块
import Article from "../../pages/Article";
import User from "../../pages/User";
import Admin from "../../pages/Admin";
import Category from "../../pages/Category";
import Auth from "../../pages/Auth";
// 404
import NoMatch from "../../pages/NoMatch";

const { Header, Sider, Content } = Layout;

function Framework({ isCollapsed }) {
    return (
        <Layout>
            <Header style={ { padding: '0 10px' } }>
                <NavBar/>
            </Header>
            <Layout>
                <Sider collapsed={ isCollapsed } style={ { minHeight: "calc( 100vh - 64px )" } }>
                    <SideMenu/>
                </Sider>
                <Content>
                    <Switch>
                        <Route path="/auth">
                            <Auth/>
                        </Route>
                        <Route path="/category">
                            <Category/>
                        </Route>
                        <Route path="/article">
                            <Article/>
                        </Route>
                        <Route path="/user">
                            <User/>
                        </Route>
                        <Route path="/admin">
                            <Admin/>
                        </Route>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Framework;