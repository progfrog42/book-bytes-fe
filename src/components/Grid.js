import {Container, Row} from "react-bootstrap";

function Grid({ children, className = "" }) {
    return (
        <Container className={className}>
            <Row className={className}>
                {children}
            </Row>
        </Container>
    );
}

export default Grid;