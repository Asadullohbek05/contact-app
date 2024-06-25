import React, { Component } from "react";
import ContactForm from "../Components/ContactForm";
import { Container, Tab, Tabs } from "react-bootstrap";
import ContactCard from "../Components/ContactCard";
import { toast } from "react-toastify";

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

    const handleSearch = (e) => {
      this.setState({ search: e.target.value });
      const contactResults = contacts.filter((el) =>
        el.firstName.toLowerCase().includes(search.trim().toLowerCase())
      );

      console.log(contactResults);
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
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <span className="input-group-text">
              <select className="form-select">
                <option value="all">All</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="relatives">Relatives</option>
                <option value="other">Other</option>
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
          <Tabs defaultActiveKey="profile" id="justify-tab-example" justify>
            <Tab eventKey="profile" title={`All Contacts (${contacts.length})`}>
              {contacts.map((el) => (
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
              eventKey="home"
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
        </Container>
      </div>
    );
  }
}

export default HomePage;
