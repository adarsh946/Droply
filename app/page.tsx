import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Register
        </CardTitle>
        <CardDescription className="text-center text-md">
          you need to signup to get access in the app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <div className=" flex flex-col py-3">
              <Label className="text-lg">Email</Label>
              <Input type="email" placeholder="Enter your Email" />
            </div>
            <div className="py-3">
              <Label className="text-lg">Password</Label>
              <Input type="text" placeholder="Enter your password" />
            </div>
            <div className="py-3">
              <Label className="text-lg">Confirm Password</Label>
              <Input type="text" placeholder="confirm your password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant={"default"}
          className="bg-black text-white min-w-[400px] cursor-pointer"
        >
          SignUp
        </Button>
      </CardFooter>
    </Card>
  );
}
