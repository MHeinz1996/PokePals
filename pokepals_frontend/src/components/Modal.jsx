import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarRatings from 'react-star-ratings'


function MyVerticallyCenteredModal(props) {
  let happiness = props.happiness
  let hunger = props.hunger
  let pokemon = props.pokemon

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Happiness</h4>
        <StarRatings rating={+happiness/2} starRatedColor="gold" numberOfStars={5} name="happiness"/>
        <h4>Belly</h4>
        <StarRatings rating={+hunger/2} starRatedColor="gold" numberOfStars={5} name="hunger"/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal