import { Producto } from "../../types/Producto";

import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { ProductoService } from "../../services/ProductoService";

//Notificaciones al usuario
import { toast } from "react-toastify";

//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ProductoModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  prod: Producto;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductoModal = ({
  show,
  onHide,
  title,
  prod,
  modalType,
  refreshData,
}: ProductoModalProps) => {
  //CREATE-UPDATE función handleSaveUpdate
  const handleSaveUpdate = async (pro: Producto) => {
    try {
      const isNew = pro.id === 0;
      if (isNew) {
        await ProductoService.createProducto(pro);
      } else {
        await ProductoService.updateProducto(pro.id, pro);
      }
      toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
        position: "top-center",
      });
      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");
    }
  };

  //Función handleDelete (DELETE)
  const handleDelete = async () => {
    try {
      await ProductoService.deleteProducto(prod.id);
      toast.success("Producto borrado", {
        position: "top-center",
      });
      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");
    }
  };
  //YUP - Esquema de validación
  const validationSchema = () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      nombre: Yup.string().required("El nombre es requerido"),
      descripcion: Yup.string().required("La descripción es requerida"),
      precioVenta: Yup.number().min(0).required("El precio de venta es requerido"),
      costo: Yup.number().min(0).required("El costo es requerido"),
      stockActual: Yup.number().min(0).default(0),
      stockMinimo: Yup.number().min(0).required("El stock mínimo es requerido")
    });
  };

  //Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
  // bloquea el formulario en caso de haber errores.
  const formik = useFormik({
    initialValues: prod,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Producto) => handleSaveUpdate(obj),
  });

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <>
          <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                {" "}
                ¿Está seguro que desea eliminar el producto
                <br /> <strong> {prod.nombre} </strong> ?
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>

              <Button variant="danger" onClick={handleDelete}>
                Borrar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            className="modal-xl"
          >
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {"Formulario"}
              <Form onSubmit={formik.handleSubmit}>
                {/*"Nombre"*/}
                <Form.Group controlId="formTitulo">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="nombre"
                    type="text"
                    value={formik.values.nombre || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.nombre && formik.touched.nombre
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*"Descripción"*/}
                <Form.Group controlId="formDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    name="descripcion"
                    type="text"
                    value={formik.values.descripcion || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.descripcion && formik.touched.descripcion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.descripcion}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*"PrecioVenta"*/}
                <Form.Group controlId="formPrecioVenta">
                  <Form.Label>Precio de Venta</Form.Label>
                  <Form.Control
                      name="precioVenta"
                      type="number"
                      value={formik.values.precioVenta || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(
                          formik.errors.precioVenta && formik.touched.precioVenta
                      )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.precioVenta}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*"Costo"*/}
                <Form.Group controlId="formCosto">
                  <Form.Label>Costo</Form.Label>
                  <Form.Control
                      name="costo"
                      type="number"
                      value={formik.values.costo || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(
                          formik.errors.costo && formik.touched.costo
                      )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.costo}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*"stockActual"*/}
                <Form.Group controlId="formStockActual">
                  <Form.Label>Stock Actual</Form.Label>
                  <Form.Control
                      name="stockActual"
                      type="number"
                      value={formik.values.stockActual || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(
                          formik.errors.stockActual && formik.touched.stockActual
                      )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.stockActual}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*"stockMinimo"*/}
                <Form.Group controlId="formStockMinimo">
                  <Form.Label>Stock Minimo</Form.Label>
                  <Form.Control
                      name="stockMinimo"
                      type="number"
                      value={formik.values.stockMinimo || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(
                          formik.errors.stockMinimo && formik.touched.stockMinimo
                      )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.stockMinimo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Modal.Footer className="mt-4">
                  <Button variant="secondary" onClick={onHide}>
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Guardar
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductoModal;
