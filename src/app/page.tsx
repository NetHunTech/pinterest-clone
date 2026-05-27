import Navbar from "@/components/layout/Navbar";
import PinCard from "@/components/pins/PinCard";
import PinGrid from "@/components/pins/PinsGrid";

export default function Page() {
  return (
    <>
      <Navbar />
      <PinGrid>
        <PinCard img={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.D8cvL4x9XHjWMwHAtnLrkQHaFj%3Fpid%3DApi&f=1&ipt=59ff64a8e14c6a738b566a6f471b8d220d311bf6ea79ab5f5d846ad6d4a7b09b&ipo=images" } />
        <PinCard img={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.qvMHaJclcJ3Q9WkIk8KcLwHaHa%3Fpid%3DApi&f=1&ipt=0d28d332a56233feb66573028102475f2bf0573aa31c25189c618eb4024197d8&ipo=images" } />
        <PinCard img={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngset.com%2Fimages%2Frandom-rochesteriteclass-img-responsive-owl-first-sitting-clothing-apparel-shirt-person-transparent-png-814817.png&f=1&nofb=1&ipt=6081892c33712fe8209bb15cad52b3f478b0a9d8fdda625a4d9c2d15468eeae6" } />
      </PinGrid>
    </>
);
}