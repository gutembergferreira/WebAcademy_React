import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand } from "reactstrap";
import { RootState } from "../redux/store";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { logout } from "../redux/slices/api.slice.login";
import { NavItem,  } from "react-bootstrap";

export default function NavBarCustom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const { produtos } = useSelector((state: RootState) => state.carrinho);

  function Logout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div>
      <Navbar
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "blue",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px solid gray",
        }}
      >
        <NavbarBrand
          style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
        >
          Loja Online
        </NavbarBrand>

        <div style={{ display: "flex", alignItems: "center" }}>
          <NavItem
            onClick={() => navigate("/home")}
            style={{ marginRight: "20px", cursor: "pointer", color: "white", transition: "background-color 0.3s, color 0.3s, font-weight 0.3s", textDecoration: location.pathname === "/home" ? "underline" : "none", fontWeight: location.pathname === "/home" ? "bold" : "normal", }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              const target = e.currentTarget;
              if (target instanceof HTMLElement) {
                target.style.paddingTop = "10px";
                target.style.paddingBottom = "10px";
                target.style.backgroundColor = "white";
                target.style.fontWeight = "bold";
                target.style.color = "black";
              }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              const target = e.currentTarget;
              if (target instanceof HTMLElement) {
                target.style.paddingTop = "10px";
                target.style.paddingBottom = "10px";
                target.style.backgroundColor = "transparent";
                target.style.color = "white";
              }
            }}
          >
            Produtos
          </NavItem>

          {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
          {!isAdmin ? (
            <NavItem
              onClick={() => navigate("/cart")}
              style={{ marginRight: "20px", cursor: "pointer", color: "white", textDecoration: location.pathname === "/cart" ? "underline" : "none", fontWeight: location.pathname === "/cart" ? "bold" : "normal", }}
              
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const target = e.currentTarget;
                if (target instanceof HTMLElement) {
                  target.style.paddingTop = "10px";
                  target.style.paddingBottom = "10px";
                  target.style.backgroundColor = "white";
                  target.style.fontWeight = "bold";
                  target.style.color = "black";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const target = e.currentTarget;
                if (target instanceof HTMLElement) {
                  target.style.paddingTop = "10px";
                  target.style.paddingBottom = "10px";
                  target.style.backgroundColor = "transparent";
                  target.style.color = "white";
                }
              }}
            >
              Carrinho ({produtos.length})
            </NavItem>
          ) : null}

          <NavItem
            onClick={() => Logout()}
            style={{ cursor: "pointer", color: "white" }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              const target = e.currentTarget;
              if (target instanceof HTMLElement) {
                target.style.paddingTop = "10px";
                target.style.paddingBottom = "10px";
                target.style.backgroundColor = "white";
                target.style.fontWeight = "bold";
                target.style.color = "black";
              }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              const target = e.currentTarget;
              if (target instanceof HTMLElement) {
                target.style.paddingTop = "10px";
                target.style.paddingBottom = "10px";
                target.style.backgroundColor = "transparent";
                target.style.fontWeight = "normal";
                target.style.color = "white";
              }
            }}
          >
            Logout
          </NavItem>
        </div>
      </Navbar>
    </div>
  );
}