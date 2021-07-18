class MemeModel {
  String message;
  List<MemeDataModel> data;

  MemeModel({this.message, this.data});

  MemeModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    if (json['data'] != null) {
      data = <MemeDataModel>[];
      json['data'].forEach((v) {
        data.add(new MemeDataModel.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['message'] = this.message;
   if (this.data != null) {
      data['data'] = this.data.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class MemeDataModel {
  String url;
  String link;
  String date;

  MemeDataModel({this.url, this.link, this.date});

  MemeDataModel.fromJson(Map<String, dynamic> json) {
    url = json['url'];
    link = json['link'];
    date = json['date'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['url'] = this.url;
    data['link'] = this.link;
    data['date'] = this.date;
    return data;
  }
}
