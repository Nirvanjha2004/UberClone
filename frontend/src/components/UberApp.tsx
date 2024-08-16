
import Header from './Header';
import RideOptions from './RideOptions';
import Map from './Map';

const UberApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <RideOptions />
          <Map />
      </div>
    </div>
  );
};

export default UberApp;
