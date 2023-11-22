import { useEffect, useState } from "react";
import { Producto } from "../../types/Producto";
import { ProductoService } from '../../services/ProductoService.ts';

import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";

import { ModalType } from "../../types/ModalType";

import ProductoModal from "../ProductoModal/ProductoModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";

const ProductoTable = () => {
  //Variable que va a contener los datos recibidos por la API
  const [productos, setProductos] = useState<Producto[]>([]);

  //Variable que muestra el componente Loader hasta que se reciban los datos de la API
  const [isLoading, setIsLoading] = useState(true);

  //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
  const [refreshData, setRefreshData] = useState(false);

  //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
  useEffect(() => {
    //Llamamos a la función para obtener todos los productos declarado en el Service
    const fetchProductos = async () => {
      const productos = await ProductoService.getProductos();
      setProductos(productos);
      setIsLoading(false);
    };

    fetchProductos();
  }, [refreshData]);

  //Test, este log está modificado para que muestre los datos de una manera más legible
  console.log(JSON.stringify(productos, null, 2));

  //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
  const initializeNewProducto = (): Producto => {
    return {
      id: 0,
      nombre: "",
      descripcion: "",
      precioVenta: 0,
      costo: 0,
      stockActual: 0,
      stockMinimo: 0,
    };
  };

  //Producto seleccionado que se va a pasar como prop al Modal
  const [producto, setProducto] = useState<Producto>(initializeNewProducto);

  //Manejo de Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  //Logica de Modal
  const handleClick = (newTitle: string, prod: Producto, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setProducto(prod);
    setShowModal(true);
  };

  return (
    <div className="m-3">
      {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
      <Button
        onClick={() =>
          handleClick(
            "Nuevo Producto",
            initializeNewProducto(),
            ModalType.CREATE
          )
        }
      >
        Nuevo Producto
      </Button>

      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          <thead>
            <tr>
              <th> NOMBRE </th>
              <th> DESCRIPCION </th>
              <th> PRECIO VENTA </th>
              <th> COSTO </th>
              <th> STOCK ACTUAL </th>
              <th> STOCK MINIMO </th>
              <th> EDITAR</th>
              <th> BORRAR </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td> {producto.nombre} </td>
                <td> {producto.descripcion} </td>
                <td> {producto.precioVenta} </td>
                <td> {producto.costo} </td>
                <td> {producto.stockActual} </td>
                <td> {producto.stockMinimo} </td>
                <td>
                  {" "}
                  <EditButton
                    onClick={() =>
                      handleClick("Editar producto", producto, ModalType.UPDATE)
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <DeleteButton
                    onClick={() =>
                      handleClick("Borrar producto", producto, ModalType.DELETE)
                    }
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <ProductoModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          prod={producto}
          refreshData={setRefreshData}
        />
      )}
    </div>
  );
};

export default ProductoTable;
