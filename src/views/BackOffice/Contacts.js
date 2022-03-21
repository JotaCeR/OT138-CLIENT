import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import { getContacts as getContactsService } from "../../services/requests/contacts";
import toast from "react-hot-toast";
import { SectionTitle } from "../../styles/BackOffice";
import Pagination from "../../components/Pagination";
import { Button } from "../../components/Inputs";
import { Content } from "../../components/Wrappers/Containers";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { createArrayOfObjects } from "../../helpers";

export default function Contacts() {
  const [limit, setLimit] = useState(10)
  const [contacts, setContacts] = useState(createArrayOfObjects(limit));
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoading, setTableLoading] = useState(true);
  useEffect(() => {
    getContacts(currentPage);
  }, []);
  async function getContacts(page) {
    setTableLoading(true);
    const {
      success,
      data: contactsData,
      errorMessage,
    } = await getContactsService(page, limit);

    if (success) {
      const { items, ...pagination } = contactsData;
      setContacts(items);
      setPagination(pagination);
    } else {
      toast.error("Error fetching contacts: " + errorMessage);
    }
    setTableLoading(false);
  }

  async function goToPage(page) {
    setCurrentPage(page);
    getContacts(page);
  }

  function showMessage(sender, message) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      cancelButtonColor: "green",
      title: `Mensaje de ${sender}`,
      text: message,
    });
  }

  return (
    <Content>
      <SectionTitle
        style={{
          marginBottom: "1rem",
        }}
      >
        Mensajes de Contacto
      </SectionTitle>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => {
            return (
              <tr key={index}>
                <td>{tableLoading?<StyledSkeleton/>: contact.name }</td>
                <td>{tableLoading?<StyledSkeleton/>: contact.phone}</td>
                <td>{tableLoading?<StyledSkeleton/>:contact.email}</td>
                <td>
                  {tableLoading?<StyledSkeleton/>:contact.createdAt &&
                    moment(contact.createdAt).format("DD/MM/YY")}
                </td>
                <td>
                {tableLoading?<StyledSkeleton/>:
                  <Button
                    style={buttonStyle}
                    onClick={() => showMessage(contact.name, contact.message)}
                  >
                    <FaEye />
                  </Button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pagination && (
        <Pagination
          onPageChange={goToPage}
          totalPages={pagination.pages || 0}
        />
      )}
    </Content>
  );
}

const buttonStyle = {
  backgroundColor: "#2FA4FF",
  color: "#fff",
  fontWeight: "600",
  height: "35px",
  width: "auto",
};

function StyledSkeleton() {
  return (
    <Skeleton style={{margin: "10px 0px"}}/>
  )
}