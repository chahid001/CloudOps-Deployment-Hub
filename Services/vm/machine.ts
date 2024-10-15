import * as gcp from "@pulumi/gcp";
import * as dotenv from "dotenv";

dotenv.config();


export function createVM(subnet: gcp.compute.Subnetwork, 
    ssh_key: string, vmName: string) {

    const VM = new gcp.compute.Instance(vmName, {

        machineType: "e2-highcpu-4",
        zone: "us-central1-a",
        bootDisk: {
            initializeParams: {
                image: "ubuntu-os-cloud/ubuntu-2204-lts",
                size: 15,
            },
        },

        networkInterfaces: [{   
            network: subnet.network,
            subnetwork: subnet.id,
            accessConfigs: [{
                //Private
            }]
        }],

        metadata: {
            "ssh-keys": ssh_key,
        }
    });

    return VM;

}