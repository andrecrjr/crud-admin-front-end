import React, { useState } from "react";
import Layout from "../../components/Container";
import { authUser } from "../../services";
import UserInformations from "./UserInformations";
const UserLogin = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [userAuth, setAuth] = useState(
    JSON.parse(localStorage.getItem("admin-user")) || null
  );

  const sendAuthUser = async (e) => {
    e.preventDefault();
    await authUser(false, inputs, setAuth);
  };
  return (
    <Layout isAuth={userAuth}>
      {!userAuth && (
        <section
          className='container'
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <section className='admin--login'>
            <h1>Autenticação de Usuário</h1>
            <form className='admin--login__form' onSubmit={sendAuthUser}>
              <input
                type='text'
                onChange={(e) =>
                  setInputs((oldData) => ({
                    ...oldData,
                    ...{ username: e.target.value },
                  }))
                }
                value={inputs.username}
                placeholder='Username do usuário'
              />
              <input
                type='password'
                placeholder='Senha do usuário'
                onChange={(e) =>
                  setInputs((oldData) => ({
                    ...oldData,
                    ...{ password: e.target.value },
                  }))
                }
                value={inputs.password}
              />
              <button className='button--main' style={{ width: "25%" }}>
                Login!
              </button>
            </form>
          </section>
        </section>
      )}
      {userAuth && <UserInformations />}
    </Layout>
  );
};

export default UserLogin;
