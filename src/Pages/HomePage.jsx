import React, { Component } from "react";
import ContactForm from "../Components/ContactForm";
import { Container, Tab, Tabs } from "react-bootstrap";
import ContactCard from "../Components/ContactCard";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";

const contactsJSON = localStorage.getItem("contacts");

class HomePage extends Component {
  state = {
    validated: false,
    isEditContact: false,
    contacts: JSON.parse(contactsJSON) || [
      {
        id: 1,
        firstName: "Asadbek",
        lastName: "Ayubov",
        phoneNumber: "+998914899186",
        relationship: "Family",
        isFavorite: true,
      },
      {
        id: 2,
        firstName: "Muhammaddiyor",
        lastName: "Odiljonov",
        phoneNumber: "+998916006618",
        relationship: "Friends",
        isFavorite: false,
      },
      {
        id: 3,
        firstName: "Qosimjon",
        lastName: "Omonov",
        phoneNumber: "+998907107856",
        relationship: "Relatives",
        isFavorite: true,
      },
      {
        id: 4,
        firstName: "Fazliddin",
        lastName: "Zokirjonov",
        phoneNumber: "+998956784534",
        relationship: "Other",
        isFavorite: false,
      },
    ],
    contact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      relationship: "Family",
    },
    search: "",
  };

  render() {
    const { validated, contacts, contact, isEditContact, search } = this.state;

    let allContacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(search) ||
        contact.lastName.toLowerCase().includes(search)
    );
    const favoriteContacts = contacts.filter((el) => el.isFavorite === true);

    // Submit Form - Add Contact
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isEditContact) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
          const newContacts = [
            ...contacts,
            { ...contact, id: Date.now(), isFavorite: false },
          ];
          this.setState({ contacts: newContacts });
          localStorage.setItem("contacts", JSON.stringify(newContacts));
          toast.success("Contact Added");
        } else {
          this.setState({ validated: true });
        }
      } else {
        const newContacts = contacts.map((el) =>
          el.id === contact.id ? contact : el
        );
        this.setState({ contacts: newContacts });
        this.setState({ isEditContact: false });
        toast.success("Contact Updated");
        localStorage.setItem("contacts", JSON.stringify(newContacts));
      }

      this.setState({
        contact: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
        },
      });
    };

    // Saving Contact Values
    const handleValue = (e) => {
      this.setState({ contact: { ...contact, [e.target.id]: e.target.value } });
    };

    // Like Contacts
    const likeContact = (id) => {
      let isLiked = contacts.find((el) => el.id === id);
      if (isLiked.isFavorite) {
        toast.info("Contact UnLiked");
      } else {
        toast.info("Contact Liked");
      }
      let newContacts = contacts.map((el) => {
        if (id === el.id) {
          return { ...el, isFavorite: !el.isFavorite };
        }
        return el;
      });
      this.setState({ contacts: newContacts });
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    };

    // Update Contact
    const editContact = (id) => {
      let currentContact = contacts.find((el) => el.id === id);
      console.log(currentContact);
      this.setState({ contact: currentContact });
      this.setState({ isEditContact: true });
    };

    // Delete Contacts
    const deleteContact = (id) => {
      let newContacts = contacts.filter((el) => el.id !== id);
      this.setState({ contacts: newContacts });
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      toast.error("Contact Deleted");
    };

    // Search Contacts
    const handleSearch = (e) => {
      this.setState({ search: e.target.value.trim().toLowerCase() });
    };

    const handleCategory = (e) => {
      let currentCategory = e.target.value;
      if (currentCategory !== "all") {
        allContacts = contacts.filter(
          (contact) => contact.relationship === currentCategory
        );
      }
    };

    return (
      <div>
        <ContactForm
          validated={validated}
          handleSubmit={handleSubmit}
          handleValue={handleValue}
          isEditContact={isEditContact}
          contact={contact}
        />
        <Container>
          <div className="my-3 input-group">
            <input
              placeholder="Search contact..."
              className="form-control"
              onChange={handleSearch}
            />
            <span className="input-group-text">
              <select className="form-select" onChange={handleCategory}>
                <option value="All">All</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Relatives">Relatives</option>
                <option value="Other">Other</option>
              </select>
            </span>
            <span className="input-group-text">
              <select className="form-select">
                <option>Sort by</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </span>
          </div>
          <Tabs defaultActiveKey="all" justify variant="pills">
            <Tab eventKey="all" title={`All Contacts (${contacts.length})`}>
              {allContacts.map((el) => (
                <ContactCard
                  key={el.id}
                  likeContact={likeContact}
                  editContact={editContact}
                  deleteContact={deleteContact}
                  {...el}
                />
              ))}
            </Tab>
            <Tab
              eventKey="favorite"
              title={`Favorite Contacts (${favoriteContacts.length})`}
            >
              {favoriteContacts.map((el) => (
                <ContactCard
                  key={el.id}
                  likeContact={likeContact}
                  editContact={editContact}
                  deleteContact={deleteContact}
                  {...el}
                />
              ))}
            </Tab>
          </Tabs>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default HomePage;
