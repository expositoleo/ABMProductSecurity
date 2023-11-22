import Carousel from 'react-bootstrap/Carousel';


const CarouselHome = () => {
  return (
    <Carousel>
    <Carousel.Item interval={1000}>
      <img 
      className='d block w-100'
      style={{maxHeight: "500px", objectFit: 'cover'}}
      src="https://i.pinimg.com/564x/ae/7b/b5/ae7bb52725ace802fa56b8647203b0fb.jpg" 
      alt="slide 1" 
      
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>

    </Carousel.Item>
    <Carousel.Item interval={500}>
      <img 
      className='d block w-100'
      style={{maxHeight: "500px", objectFit: 'cover'}}
      src="https://i.pinimg.com/564x/84/bb/80/84bb80a5e0ce779fca4c1f6a4d444987.jpg" alt="slide2" />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      
      <img 
      className='d block w-100'
      style={{maxHeight: "500px", objectFit: 'cover'}}
      src="https://i.pinimg.com/564x/d9/cf/27/d9cf27659fbd89db5d31babef06d4baa.jpg" alt="slide3" />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselHome